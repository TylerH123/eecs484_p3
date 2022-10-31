import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;

import org.json.JSONObject;
import org.json.JSONArray;

public class GetData {

    static String prefix = "project3.";

    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;

    // You must refer to the following variables for the corresponding 
    // tables in your database
    String userTableName = null;
    String friendsTableName = null;
    String cityTableName = null;
    String currentCityTableName = null;
    String hometownCityTableName = null;

    // DO NOT modify this constructor
    public GetData(String u, Connection c) {
        super();
        String dataType = u;
        oracleConnection = c;
        userTableName = prefix + dataType + "_USERS";
        friendsTableName = prefix + dataType + "_FRIENDS";
        cityTableName = prefix + dataType + "_CITIES";
        currentCityTableName = prefix + dataType + "_USER_CURRENT_CITIES";
        hometownCityTableName = prefix + dataType + "_USER_HOMETOWN_CITIES";
    }

    // TODO: Implement this function
    @SuppressWarnings("unchecked")
    public JSONArray toJSON() throws SQLException {

        // This is the data structure to store all users' information
        JSONArray users_info = new JSONArray();
        
        try (Statement stmt = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY)) {
            // Your implementation goes here....
            
            ResultSet rst = stmt.executeQuery(
                "SELECT * FROM " + userTableName
            );

            while (rst.next()) {
                JSONObject user = new JSONObject(); 
                JSONArray f = new JSONArray(); 
                JSONObject current_city = new JSONObject(); 
                JSONObject hometown_city = new JSONObject();
                int user_id = rst.getInt(1);

                user.put("MOB", rst.getInt(5)); 
                user.put("gender", rst.getString(7));
                user.put("user_id", user_id); 
                user.put("DOB", rst.getInt(6));
                user.put("last_name", rst.getString(3));
                user.put("first_name", rst.getString(2));
                user.put("YOB", rst.getInt(4));

                try (Statement stmtInner = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY)) {
                    ResultSet current_city_rst = stmtInner.executeQuery(
                        "SELECT C.city_name, C.state_name, C.country_name " + 
                        "FROM " + cityTableName + " C, " + currentCityTableName + " R " +
                        "WHERE R.user_id = " + user_id + " AND R.current_city_id = C.city_id"
                    );
                    // System.out.println("SELECT C.city_name, C.state_name, C.country_name " + 
                    //     "FROM " + cityTableName + " C, " + currentCityTableName + " R " +
                    //     "WHERE R.user_id = " + user_id + " AND R.current_city_id = C.city_id"); 
                    if (current_city_rst.next()) {
                        current_city.put("city", current_city_rst.getString(3));
                        current_city.put("state", current_city_rst.getString(1));
                        current_city.put("country", current_city_rst.getString(2));
                    }
                    user.put("current", current_city);
                    
                    ResultSet hometown_city_rst = stmtInner.executeQuery(
                        "SELECT C.city_name, C.state_name, C.country_name " + 
                        "FROM " + cityTableName + " C, " + hometownCityTableName + " H " +
                        "WHERE H.user_id = " + user_id + " AND H.hometown_city_id = C.city_id"
                    );
                    if (hometown_city_rst.next()) {
                        hometown_city.put("country", hometown_city_rst.getString(3)); 
                        hometown_city.put("city", hometown_city_rst.getString(1)); 
                        hometown_city.put("state", hometown_city_rst.getString(2)); 
                    }
                    user.put("hometown", hometown_city);

                    // ResultSet friends_rst = stmtInner.executeQuery(
                    //     "SELECT USER1_ID AS Friends FROM " + friendsTableName + " " +
                    //     "WHERE USER2_ID = " + user_id + " " +
                    //     "UNION " + 
                    //     "SELECT USER2_ID AS Friends FROM " + friendsTableName + " " + 
                    //     "WHERE USER1_ID = " + user_id
                    //     );  

                    System.out.println("SELECT USER1_ID AS Friends FROM " + friendsTableName + " " +
                        "WHERE USER2_ID = " + user_id + " " +
                        "UNION " + 
                        "SELECT USER2_ID AS Friends FROM " + friendsTableName + " " + 
                        "WHERE USER1_ID = " + user_id); 
                    
                    // while(friends_rst.next()) {
                    //     f.put(friends_rst.getInt(1)); 
                    // }
                    user.put("friends", f);

                    stmtInner.close();
                } catch (SQLException e) {
                    System.err.println(e.getMessage());
                }
                
                users_info.put(user); 
            }

            stmt.close();
            
            
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        return users_info;
    }

    // This outputs to a file "output.json"
    // DO NOT MODIFY this function
    public void writeJSON(JSONArray users_info) {
        try {
            FileWriter file = new FileWriter(System.getProperty("user.dir") + "/output.json");
            file.write(users_info.toString());
            file.flush();
            file.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
