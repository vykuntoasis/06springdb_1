package com.example.demo.VendorController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Address;
import com.example.demo.entities.Vendor;
import com.example.demo.service.AddressService;


@RestController
public class AddressController {
	
	
	@Autowired
	AddressService addressSrv;
	
	@RequestMapping("/address")
	public  List<Address> getAddress() {
		return addressSrv.getAddress();
	}
	
	@PostMapping("/address")
	public Address createNewAddress(@RequestBody Address payload) {
		return addressSrv.createAddress(payload);
	}
}
