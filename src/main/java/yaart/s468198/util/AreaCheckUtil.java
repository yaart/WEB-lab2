package yaart.s468198.util;

public class AreaCheckUtil {
    private final double x;
    private final double y;
    private final double r;

    public AreaCheckUtil(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean isHit() {
        return checkSquare() || checkTriangle() || checkCircle();
    }

    private boolean checkCircle() {
        return x * x + y * y <= r * r && x <= 0 && y >= 0;
    }

    private boolean checkSquare() {
        return (x >= 0 && x <= r && y >= 0 && y <= r);
    }

    private boolean checkTriangle() {
        return (x >= 0 && y <= 0 && y >= x / 2 - r / 2);
    }
}