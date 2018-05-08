import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;

class SerializeString{
	public String serialize(Vector<String[]> input){
		StringBuilder output = new StringBuilder("");
		for(int i=0; i<input.size(); i++){
			String[] sArr = input.get(i); 
			for(int j=0; j<sArr.length; j++){
				output.append(sArr[j]); output.append("|");
			}
			output.append("||");
		}
		return output.toString();
	}
}

public class DisplayProduct extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   
		SerializeString serializeString = new SerializeString();
    	response.setContentType("text/html");
    	PrintWriter out = response.getWriter();
		String clickedSku = "";
		clickedSku = (String)request.getParameter("clickedSku"); 
		String query = "SELECT sku, vendorModel, description, features, retail, quantity FROM product where sku = '"+clickedSku+"';";
		Vector<String[]> result = DBHelper.runQuery(query);
		String stringResult = serializeString.serialize(result);
		out.print(stringResult);
    }  
}
