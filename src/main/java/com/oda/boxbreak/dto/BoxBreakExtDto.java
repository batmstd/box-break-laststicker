package com.oda.boxbreak.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoxBreakExtDto extends BoxBreakDto {
    List<String> order;
    List<UserWithTeamsDto> usersWithTeams;
    List<String> result;
    List<String> teams;
}
