package com.abc.construction.web;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

  @GetMapping("/")
  public Map<String, Object> root() {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("ok", true);
    body.put("service", "ABC Construction API");
    body.put("backend", "java");
    body.put("health", "/api/health");
    body.put("quotations", "/api/quotations");
    return body;
  }

  @GetMapping("/api/health")
  public Map<String, Object> health() {
    return Map.of("ok", true, "backend", "java");
  }
}
