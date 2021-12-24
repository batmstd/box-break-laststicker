package com.oda.boxbreak.model;

import lombok.AllArgsConstructor;
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
@Table(name = "box_break")
@NoArgsConstructor
public class BoxBreakEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "author")
    String author;

    @Column(name = "date")
    Instant date;

    @Column(name = "type")
    String type;

    @Column(name = "active")
    boolean active;

    @ElementCollection
    @CollectionTable(name = "box_break_teams", joinColumns = @JoinColumn(name = "box_break_id"))
    @Column(name = "team")
    List<String> Teams;

    @ElementCollection
    @CollectionTable(name = "box_break_order", joinColumns = @JoinColumn(name = "box_break_id"))
    @Column(name = "name")
    List<String> Order;

    public static BoxBreakEntity of(String name, String author, List<String> teams, List<String> order) {
        BoxBreakEntity boxBreakEntity = new BoxBreakEntity();
        boxBreakEntity.setActive(true);
        boxBreakEntity.setAuthor(author);
        boxBreakEntity.setName(name);
        boxBreakEntity.setTeams(teams);
        boxBreakEntity.setOrder(order);
        boxBreakEntity.setDate(Instant.now());
        return boxBreakEntity;
    }
}
