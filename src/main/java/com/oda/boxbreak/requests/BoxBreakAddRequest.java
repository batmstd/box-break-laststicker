package com.oda.boxbreak.requests;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoxBreakAddRequest {
    String author;
    String name;
    List<String> teams;
    List<String> order;
    String type;
}
