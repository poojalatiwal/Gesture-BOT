package com.project.GestureBotApplication.repository;

import com.project.GestureBotApplication.entity.BotStatus;
import jakarta.transaction.Transactional;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BotStatusRepository extends JpaRepository<BotStatus, Long> {
    @Query("SELECT gesture FROM BotStatus where botId = :botId")
    String getGestureByBotId(int botId);

    @Modifying
    @Transactional
    @Query("UPDATE BotStatus b SET b.gesture = :cmd WHERE b.botId = :botId")
    void updateGestureByBotId(@Param("cmd") String cmd, @Param("botId") Integer botId);

    @Query(value = "SELECT gesture FROM bot_status WHERE bot_id = :botId ORDER BY timestamp DESC LIMIT 1", nativeQuery = true)
    String getLatestGestureByBotId(@Param("botId") int botId);


    List<BotStatus> findAllByBotId(Integer botId);
}
