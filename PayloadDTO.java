package com.project.GestureBotApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayloadDTO {
    private String command;
    private Integer botId;


    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Integer getBotId() {
        return botId;
    }

    public void setBotId(Integer botId) {
        this.botId = botId;
    }



}
