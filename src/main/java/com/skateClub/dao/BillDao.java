package com.skateClub.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skateClub.POJO.Bill;

public interface BillDao extends JpaRepository<Bill, Integer>{
    
}
