package com.oda.boxbreak.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(staticName = "of")
public class ActiveBoxBreaksDto {
    String type;
    List<BoxBreakDto> boxBreaks;
}
