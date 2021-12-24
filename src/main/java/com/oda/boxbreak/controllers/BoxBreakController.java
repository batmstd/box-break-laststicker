package com.oda.boxbreak.controllers;

import com.oda.boxbreak.dto.ActiveBoxBreaksDto;
import com.oda.boxbreak.dto.BoxBreakDto;
import com.oda.boxbreak.dto.BoxBreakExtDto;
import com.oda.boxbreak.requests.BoxBreakAddRequest;
import com.oda.boxbreak.interfaces.BoxBreak;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/v1/box-breaks")
public class BoxBreakController {

    private final BoxBreak boxBreak;

    @PostMapping(path = "/add")
    public void add(@RequestBody BoxBreakAddRequest request) {
        boxBreak.add(request.getAuthor(), request.getName(), request.getTeams(), request.getOrder());
    }

    @GetMapping(path = "/actives")
    public List<ActiveBoxBreaksDto> actives() {
        return boxBreak.getActives();
    }

    @GetMapping(path = "/{id}")
    public BoxBreakExtDto actives(@PathVariable("id") Long id) {
        return boxBreak.getById(id);
    }

    @PostMapping(path = "/deactivate/{id}")
    public void deactivate(@PathVariable("id") Long id) {
        boxBreak.deactivate(id);
    }
}
