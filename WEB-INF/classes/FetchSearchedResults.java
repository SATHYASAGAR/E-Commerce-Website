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

	public List<String> getList(String res,String searchTerm){
	List<String> result = new ArrayList<>();
	String[] arr = res.split("\\|\\|\\|");
	for (String temp: arr){
			String t= temp.toLowerCase().trim();
			String r = searchTerm.toLowerCase().trim();
		 if(t.indexOf(r)!=-1){
				String[] resArray = temp.split("\\|");
				result.add(resArray[0]);
			}else{
				result.add("notfound");
			}
       }
		return result;
	}
}

public class FetchSearchedResults extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   

		List<String> resultList  = new ArrayList<>();
		Vector<String[]> result = new Vector<String[]>();
		Vector<String[]> resultToDisplay = new Vector<String[]>();
		SerializeString serializeString = new SerializeString();
    	response.setContentType("text/html");
    	PrintWriter out = response.getWriter();
		String searchedTerm = (String)request.getParameter("searchString");
		String s = "SELECT sku, description, features, retail, category.name, vendor.name FROM product, category, vendor WHERE product.catID = category.id AND product.venID = vendor.id;";
		result = DBHelper.runQuery(s);
		String resultString = serializeString.serialize(result);
		resultList = serializeString.getList(resultString,searchedTerm);
		//out.print("serialized list  is "+ resultList);
		List<String> skuList = new ArrayList<>();
		for(String element: resultList){
			if(element.matches("[A-Z]{3}-[0-9]{3}")){
				
					skuList.add(element);
				}
		}
		
		//out.print("serialized list  is "+ skuList);

    	String q = "SELECT sku, vendorModel, description, retail, quantity FROM product WHERE sku IN (";
		for(String sku: skuList){
			q+="'"+sku+"'"+",";
		}
		q=q.substring(0, q.length() - 1);
		q+=");";
		
		
    	resultToDisplay = DBHelper.runQuery(q);
		//out.print(q);
		
		String stringResult = serializeString.serialize(resultToDisplay);
		out.print(stringResult); 
    }  
}
