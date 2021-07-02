package com.oda.boxbreak.interfaces;

import com.oda.boxbreak.dto.BoxBreakDto;
import com.oda.boxbreak.dto.BoxBreakExtDto;

import java.util.List;

public interface BoxBreak {

    void add(String author, String name, List<String> teams, List<String> order);

    List<BoxBreakDto> getActives();

    BoxBreakExtDto getById(Long id);

    void deactivate(Long id);
}
