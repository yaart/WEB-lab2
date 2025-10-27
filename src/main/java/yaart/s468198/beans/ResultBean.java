package yaart.s468198.beans;

import java.io.Serializable;

public class ResultBean implements Serializable {
    private UserValueBean userValueBean;
    private boolean hit;
    private String startTime;
    private long executionTime;

    public void setUserValueBean(UserValueBean userValueBean) {
        this.userValueBean = userValueBean;
    }

    public UserValueBean getUserValueBean() {
        return userValueBean;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public boolean getHit() {
        return hit;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    public long getExecutionTime() {
        return executionTime;
    }
}