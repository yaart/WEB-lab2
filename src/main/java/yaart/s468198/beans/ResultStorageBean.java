package yaart.s468198.beans;

import java.io.Serializable;
import java.util.ArrayList;

public class ResultStorageBean implements Serializable {
    private ArrayList<ResultBean> resultList = new ArrayList<>();

    public void setResultList(ArrayList<ResultBean> resultList) {
        this.resultList = resultList;
    }
    public ArrayList<ResultBean> getResultList() {
        return resultList;
    }
}