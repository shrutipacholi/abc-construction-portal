package com.abc.construction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class ConstructionServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConstructionServerApplication.class, args);
	}

}
