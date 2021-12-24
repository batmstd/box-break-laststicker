package com.oda.boxbreak.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoxBreakDto {
    Long id;
    String author;
    String name;
    String type;
}
