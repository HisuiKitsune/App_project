package com.skateClub.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.skateClub.constants.ProductsConstants;
import com.skateClub.rest.BillRest;
import com.skateClub.service.BillService;
import com.skateClub.utils.ProdutosUtil;


@RestController
public class BillRestImpl implements BillRest{

    @Autowired
    BillService billService;

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        
        try{
            return billService.generateReport(requestMap);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ProdutosUtil.getResponseEntity(ProductsConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
