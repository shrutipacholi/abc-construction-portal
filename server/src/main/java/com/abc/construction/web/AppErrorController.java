package com.abc.construction.web;

import jakarta.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppErrorController implements ErrorController {

  @RequestMapping("/error")
  public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
    Object statusAttr = request.getAttribute("jakarta.servlet.error.status_code");
    int status = statusAttr instanceof Integer code ? code : 500;

    Map<String, Object> body = new LinkedHashMap<>();
    body.put("ok", false);
    body.put("status", status);
    body.put("message", status == 404 ? "Not found" : "Unexpected error");
    body.put("health", "/api/health");
    body.put("quotations", "/api/quotations");

    return ResponseEntity.status(HttpStatus.valueOf(status)).body(body);
  }
}
