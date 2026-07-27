package com.abc.construction.web;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quotations")
public class QuotationController {

  private final List<Map<String, Object>> quotations = new CopyOnWriteArrayList<>();

  @GetMapping
  public Map<String, Object> list() {
    return Map.of("quotations", new ArrayList<>(quotations));
  }

  @PostMapping
  public ResponseEntity<Map<String, Object>> add(@RequestBody(required = false) Map<String, Object> body) {
    if (body == null) body = Map.of();

    String name = text(body.get("name"));
    String mobile = text(body.get("mobile"));
    String email = text(body.get("email"));
    String address = text(body.get("address"));

    if (name.isBlank() || mobile.isBlank() || email.isBlank()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Name, mobile number, and email are required"));
    }

    Map<String, Object> item = new LinkedHashMap<>();
    item.put("id", UUID.randomUUID().toString().substring(0, 8));
    item.put("name", name);
    item.put("mobile", mobile);
    item.put("email", email);
    item.put("address", address);
    item.put("status", "Submitted");
    quotations.add(item);

    Map<String, Object> response = new LinkedHashMap<>(item);
    response.put(
        "message",
        "Your quotation will be sent to your mobile number or email. Our team will connect with you shortly for further assistance.");

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  private static String text(Object value) {
    return value == null ? "" : String.valueOf(value).trim();
  }
}
