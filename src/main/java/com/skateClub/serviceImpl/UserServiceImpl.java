package com.skateClub.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.google.common.base.Strings;
import com.skateClub.JWT.CustomerUsersDetailsService;
import com.skateClub.JWT.JwtFilter;
import com.skateClub.JWT.JwtUtil;
import com.skateClub.POJO.User;
import com.skateClub.constants.ProductsConstants;
import com.skateClub.dao.UserDao;
import com.skateClub.service.UserService;
import com.skateClub.utils.EmailUtil;
import com.skateClub.utils.ProdutosUtil;
import com.skateClub.wrapper.UserWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    EmailUtil emailUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {

            if (validateSignUpMap(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {

                    userDao.save(getUserFromMap(requestMap));
                    return ProdutosUtil.getResponseEntity("Successfully Registered.", HttpStatus.OK);
                } else {
                    return ProdutosUtil.getResponseEntity("Email already exists.", HttpStatus.BAD_REQUEST);
                }

            } else {
                return ProdutosUtil.getResponseEntity(ProductsConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("name") && requestMap.containsKey("contactNumber") && requestMap.containsKey("email")
                && requestMap.containsKey("password")) {
            return true;
        }
        return false;
    }

    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(BCrypt.hashpw(requestMap.get("password"), BCrypt.gensalt(12)));
        user.setStatus("false");
        user.setRole("user");

        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login");       

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password")));                  

            if (!authentication.isAuthenticated()) {
                if (customerUsersDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true")) {
                    return new ResponseEntity<String>(
                           "token: "+ jwtUtil.generateToken(customerUsersDetailsService.getUserDetail().getEmail(),
                           customerUsersDetailsService.getUserDetail().getRole()),
                            HttpStatus.OK);

                } else {
                   
                    return new ResponseEntity<String>("{\"message\":\"" + "Wait for admin approval." + "\"}",
                            HttpStatus.BAD_REQUEST);
                }
            }

        } catch (Exception ex) {
            log.error("{}", ex);           
        }
        return new ResponseEntity<String>("{\"message\":\"" + "Bad Credentials." + "\"}", HttpStatus.BAD_REQUEST);
        
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {

        try {

            if (jwtFilter.isAdmin()) {

                return new ResponseEntity<>(userDao.getAllUser(), HttpStatus.OK);

            } else {

                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {

        try {

            if (jwtFilter.isAdmin()) {

                Optional<User> optional = userDao.findById(Integer.parseInt(requestMap.get("id")));

                if (!optional.isEmpty()) {

                    userDao.updateStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));

                    sendMailToAllAdmin(requestMap.get("status"), optional.get().getEmail(), userDao.getAllAdmin());

                    return ProdutosUtil.getResponseEntity("User Status update Successfully", HttpStatus.OK);

                } else {
                    return ProdutosUtil.getResponseEntity("User id doesn't not exist", HttpStatus.OK);
                }

            } else {
                return ProdutosUtil.getResponseEntity(ProductsConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<String> checkToken() {

        return ProdutosUtil.getResponseEntity("true", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {

        try {
            User userObj = userDao.findByEmail(jwtFilter.getCurrentUser());

            if (!userObj.equals(null)) {

                if (userObj.getPassword().equals(requestMap.get("oldPassword"))) {
                    userObj.setPassword(requestMap.get("newPassword"));
                    userDao.save(userObj);
                    return ProdutosUtil.getResponseEntity("Password Update Successfully", HttpStatus.OK);
                }
                return ProdutosUtil.getResponseEntity("Incorrect old Password", HttpStatus.BAD_REQUEST);

            }
            return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG,
                    HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {

        try {

            User user = userDao.findByEmail(requestMap.get("email"));

            if (!Objects.isNull(user) && !Strings.isNullOrEmpty(user.getEmail()))
                emailUtil.forgotMail(user.getEmail(), "Credentials by Skate Club Management System",
                        user.getPassword());

            return ProdutosUtil.getResponseEntity("Check your mail for Credentials.", HttpStatus.OK);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendMailToAllAdmin(String status, String user, List<String> allAdmin) {

        allAdmin.remove(jwtFilter.getCurrentUser());

        if (status != null && status.equalsIgnoreCase("true")) {

            emailUtil.sendSimpleMessage(jwtFilter.getCurrentUser(), "Account Approved",
                    "USER:- " + user + " \n is approved by \nADMIN:-" + jwtFilter.getCurrentUser(), allAdmin);

        } else {

            emailUtil.sendSimpleMessage(jwtFilter.getCurrentUser(), "Account Disabled",
                    "USER:- " + user + " \n is disabled by \nADMIN:-" + jwtFilter.getCurrentUser(), allAdmin);

        }
    }
}
