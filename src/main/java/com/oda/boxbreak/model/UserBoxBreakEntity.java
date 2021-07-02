package com.oda.boxbreak.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user_box_break")
@NoArgsConstructor
public class UserBoxBreakEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "box_break_id")
    Long boxBreakId;

    @ElementCollection
    @CollectionTable(name = "user_box_break_teams", joinColumns = @JoinColumn(name = "user_box_break_id"))
    @Column(name = "team")
    List<String> Teams;


    public static UserBoxBreakEntity of(String name, Long boxBreakId, List<String> teams) {
        UserBoxBreakEntity userBoxBreakEntity = new UserBoxBreakEntity();
        userBoxBreakEntity.setBoxBreakId(boxBreakId);
        userBoxBreakEntity.setName(name);
        userBoxBreakEntity.setTeams(teams);
        return userBoxBreakEntity;
    }
}
