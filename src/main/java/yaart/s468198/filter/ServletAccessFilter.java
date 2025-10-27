package yaart.s468198.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter("/*")
public class ServletAccessFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();
        String contextPath = httpRequest.getContextPath();

        String relativePath = requestURI.substring(contextPath.length());


        if (isAllowedAccess(relativePath)) {
            chain.doFilter(request, response);
        } else {
            httpResponse.sendRedirect(contextPath);
        }
    }

    private boolean isAllowedAccess(String path) {
        if (path.equals("/areaChecker") || path.equals("/areaChecker/")) {
            return false;
        }

        return true;
    }
}