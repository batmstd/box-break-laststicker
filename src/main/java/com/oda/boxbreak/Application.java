package com.oda.boxbreak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

@Component
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ErrorViewResolver fallbackToIndex() {
        return (request, status, model) -> {
            if (status != HttpStatus.NOT_FOUND) {
                return null;
            }

            final String path = (String) model.get("path");
            if (path.startsWith("/api/")) {
                return null;
            }

            return new ModelAndView("/index.html", HttpStatus.OK);
        };
    }
}
