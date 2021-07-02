package com.oda.boxbreak.interfaces;

import com.oda.boxbreak.dto.UserWithTeamsDto;

import java.util.List;

public interface UserBoxBreakGet {

    List<UserWithTeamsDto> getUsers(Long boxBreakId);
}
