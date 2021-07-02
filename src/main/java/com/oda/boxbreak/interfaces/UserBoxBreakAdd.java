package com.oda.boxbreak.interfaces;

import java.util.List;

public interface UserBoxBreakAdd {
    void add(String name, Long boxBreakId, List<String> teams);

    void update(String name, Long boxBreakId, List<String> teams);
}
