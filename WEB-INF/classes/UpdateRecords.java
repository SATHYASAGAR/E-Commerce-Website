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

public class UpdateRecords extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   
		List<Integer> successFailList= new ArrayList<>();
		SerializeString serializeString = new SerializeString();
    	response.setContentType("text/html");
    	PrintWriter out = response.getWriter();
		String inputInfo = (String)request.getParameter("objectsToUpdate");
		String[] collectionRecords = inputInfo.split("\\|\\|");
		for(String records: collectionRecords){
				String[] updateInfoArray = records.split("\\|");
				String sku = updateInfoArray[0]; String updatedQuantity = updateInfoArray[1];				
				String s = "UPDATE product SET quantity = "+updatedQuantity+" WHERE sku = '"+sku+"' ;";
				int queryResult = DBHelper.updateRecords(s);
				successFailList.add(queryResult);
		}
		out.print(successFailList);
    }  
}
