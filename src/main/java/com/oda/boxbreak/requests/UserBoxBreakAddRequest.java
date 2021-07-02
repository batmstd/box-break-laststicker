package com.oda.boxbreak.requests;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserBoxBreakAddRequest {
    Long boxBreakId;
    String name;
    List<String> teams;
}
