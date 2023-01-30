package com.skateClub.serviceImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skateClub.JWT.JwtFilter;
import com.skateClub.POJO.Bill;
import com.skateClub.constants.ProductsConstants;
import com.skateClub.dao.BillDao;
import com.skateClub.service.BillService;
import com.skateClub.utils.ProdutosUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BillServiceImpl implements BillService {

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    BillDao billDao;
    

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        log.info("Inside generateReport");

        try {

            String fileName;
                if(ValidateRequestMap(requestMap)) {

                    if(requestMap.containsKey("isGenerate") && !(Boolean)requestMap.get("isGenerate")) {
                        fileName = (String) requestMap.get("uuid");

                    } else {
                        fileName = ProdutosUtil.getUUID();
                        requestMap.put("uuid",fileName);
                        insertBill(requestMap);
                    }

                    String data = "Name: "+requestMap.get("name") + "\n"+"Contact Number: "+requestMap.get("contactNumber") + "\n"
                    
                }
                return ProdutosUtil.getResponseEntity("Required data not found.", HttpStatus.BAD_REQUEST);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void insertBill(Map<String, Object> requestMap) {

        try {

            Bill bill = new Bill();
            bill.setUuid((String) requestMap.get("uuid"));
            bill.setName((String) requestMap.get("name"));
            bill.setEmail((String) requestMap.get("email"));
            bill.setContactNumber((String) requestMap.get("contactNumber"));
            bill.setPaymentMethod((String) requestMap.get("paymentMethod"));
            bill.setTotal(Integer.parseInt((String) requestMap.get("totalAmount")));
            bill.setProductDetails((String) requestMap.get("productDetails"));
            bill.setCreatedBy(jwtFilter.getCurrentUser());
            billDao.save(bill);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private boolean ValidateRequestMap(Map<String, Object> requestMap) {
        return requestMap.containsKey("name") &&
                requestMap.containsKey("contactNumber") &&
                requestMap.containsKey("email") &&
                requestMap.containsKey("paymentMethod") &&
                requestMap.containsKey("productDetails") &&
                requestMap.containsKey("totalAmount");
    }

}
