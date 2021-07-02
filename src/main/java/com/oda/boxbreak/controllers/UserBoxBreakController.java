package com.oda.boxbreak.controllers;

import com.oda.boxbreak.interfaces.UserBoxBreakAdd;
import com.oda.boxbreak.requests.UserBoxBreakAddRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/v1/user-box-breaks")
public class UserBoxBreakController {

    private final UserBoxBreakAdd userBoxBreakAdd;

    @PostMapping(path = "/add")
    public void add(@RequestBody UserBoxBreakAddRequest request) {
        userBoxBreakAdd.add(request.getName(), request.getBoxBreakId(), request.getTeams());
    }

    @PostMapping(path = "/update")
    public void update(@RequestBody UserBoxBreakAddRequest request) {
        userBoxBreakAdd.update(request.getName(), request.getBoxBreakId(), request.getTeams());
    }
}
