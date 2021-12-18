#Simple script for CS348 Fall 2021 Group Project
#Takes the data from the orders CSV and turns it into
#SQL Insert statements
#Yup that it, turns a CSV into insert statements
#Boom


# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import pandas as pd
import mysql.connector

config = {
        'user':'mercuryAdmin',
        'password':'cs348Project',
        'host':'project-mercury.cuh3napsxadn.us-east-2.rds.amazonaws.com',
        'database':'Mercury',
        #'cursorclass':'cursors.SSCursor'
 }

def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.

def print_cursor():
    for row in cursor:
            print(row)
    print("\n\n\n")

def valid_id(id):
    # Parameterized query
    sql_valid_id_query = """ 
    SELECT *
    FROM `Broker`
    WHERE account_id = %s
    """
    cursor.execute(sql_valid_id_query, [id])


def create_orders_inserts(df):
    # Parameterized query
    sql_insert_query = """ INSERT INTO Orders(Order_Number,Asset_Name,Order_Date,Order_Time,Amount,Currency,
                                   Buy_Sell,Stop_Loss,Take_Profit,Account_ID,Order_Status,Profit) VALUES 
                                   (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    for row in df.itertuples():
        cursor.execute(sql_insert_query, row)
    connection.commit()
    df.columns
#                   Report_1() aims answer the question
# What is the average change of price, of stocks in my watchlist?
# The user inputs their Account_ID
def Report_1(id):
    # Parameterized query
    sql_stock_change_query = """
    SELECT Account_ID, Watchlist_Name, AVG( change_per )
    FROM (
        SELECT Broker.Account_ID, Watchlist_Name, Stocks.Name, Stock_Symbol, Change_Per, Price, High AS "Daily High",
                Low AS "Daily Low", Email, Broker.Name AS "Exchange Name", Phone_Number, Total_Holdings
        FROM `Watchlist_Content`
        JOIN `Watchlist`
        JOIN `Stocks`
        JOIN `Broker`
        WHERE Watchlist.Name = Watchlist_Name
        AND Stocks.Symbol = Stock_Symbol
        AND Watchlist.Account_ID = Broker.Account_ID
    ) AS VIEW
    GROUP BY Watchlist_Name
    HAVING Account_ID = %s """
    cursor.execute(sql_stock_change_query, [id])
    print_cursor()

#                   Report_2() aims answer the question
# What order lost/made me the most money?
# The user inputs their Account_ID
def Report_2(id):
    # Parameterized query
    sql_order_min_max_query = """
    Select account_id as ID, Order_Number, Asset_Name, Order_Date as Date, Order_Time as Time, Amount, Currency, Buy_Sell as Activity, Stop_Loss, Take_Profit, Profit, Order_Status
	From (
		SELECT *
		FROM Orders
		JOIN (
			SELECT account_id as id, MAX( profit ) as max_p , MIN( profit ) as min_p
			FROM Orders
			GROUP BY id
		) AS view
		WHERE Orders.account_id = id
		AND Orders.profit = max_p
		OR Orders.profit = min_p
	) AS min_max_view
    where id = %s   """
    cursor.execute(sql_order_min_max_query, [id])



#                   Report_3() aims answer the question
# What orders are open?
# The user inputs their Account_ID, Order Status
def Report_3(id, status):
    # Parameterized query
    sql_open_order_query = """
    SELECT account_id as ID, Order_Number, Asset_Name, Order_Date as Date, Order_Time as Time, Amount, Currency, Buy_Sell as Activity, Stop_Loss, Take_Profit, Profit, Order_Status
    FROM Orders
    WHERE order_status = %s 
    AND Account_id = %s  """
    cursor.execute(sql_open_order_query, [status, id])

#                   Report_4() aims answer the question
# How many orders have I made?
# The user inputs their Account_ID
def Report_4(id):
    # Parameterized query
    sql_order_count_query = """
    SELECT account_id, SUM( cnt )
    FROM (	
	SELECT account_id, order_status, COUNT( order_status ) AS cnt
	FROM Orders
	GROUP BY account_id, order_status
    ) AS order_status_count_view
    WHERE account_id = %s 
    """
    cursor.execute(sql_order_count_query, [id])

#                   Report_5() aims answer the question
# What stock has made me the most money?
# The user inputs their Account_ID
def Report_5(id):
    # Parameterized query
    sql_highest_profit_query = """
    SELECT sum_profit.Account_ID AS id, sum_profit.Asset_Name AS Asset, Highest_Profit
    FROM (
	    SELECT account_id, asset_name, SUM( profit ) AS Total_Profit
	    FROM Orders
	    GROUP BY account_id, asset_name
    ) AS sum_profit
    JOIN (
	    SELECT account_id, MAX( Total_Profit ) AS Highest_Profit
	    FROM (
		    SELECT account_id, asset_name, SUM( profit ) AS Total_Profit
		    FROM Orders
		    GROUP BY account_id, asset_name
	    ) AS sum_profit
	    GROUP BY account_id
    )highest_profit_view
    WHERE sum_profit.Account_ID = highest_profit_view.account_id
    AND Total_Profit = Highest_Profit
    AND sum_profit.account_id = %s 
    """
    cursor.execute(sql_highest_profit_query, [id])

#                   Report_6() aims answer the question
# What stock has lost me the most money?
# The user inputs their Account_ID
def Report_6(id):
    # Parameterized query
    sql_lowest_profit_query = """
    SELECT sum_profit.Account_ID AS id, sum_profit.Asset_Name AS Asset, Lowest_Profit
    FROM (
	    SELECT account_id, asset_name, SUM( profit ) AS Total_Profit
	    FROM Orders
	    GROUP BY account_id, asset_name
    ) AS sum_profit
    JOIN (
	    SELECT account_id, MIN( Total_Profit ) AS Lowest_Profit
	    FROM (
    		SELECT account_id, asset_name, SUM( profit ) AS Total_Profit
	    	FROM Orders
	    	GROUP BY account_id, asset_name
	    ) AS sum_profit
	    GROUP BY account_id
    )lowest_profit_view
    WHERE sum_profit.Account_ID = lowest_profit_view.account_id
    AND Total_Profit = Lowest_Profit
    AND sum_profit.account_id = %s 
    """
    cursor.execute(sql_lowest_profit_query, [id])

#                   Report_7() aims answer the question
# How many open order do I have on the stock with the highest change in percent?
# The user inputs their Account_ID
def Report_7(id):
    # Parameterized query
    print("****THIS QUERY IS COMING IN UPDATE 2.0****")
    return



#                   Report_8() aims answer the question
# How much have I made/lost?
# The user inputs their Account_ID
def Report_8(id):
    # Parameterized query
    sql_sum_profit_query = """
    SELECT account_id, SUM( profit )
    FROM Orders
    GROUP BY account_id
    HAVING account_id = %s 
    """
    cursor.execute(sql_sum_profit_query, [id])



# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    df = pd.read_csv('C:/Users/ethan/OneDrive/Desktop/Semester 11/CS348/Project/Project_Order_Data.xlsb.csv',index_col=0)
    df_as_string = df.to_string()
    sign_in_event_loop = 1
    reports_event_loop = 0
    #print(df_as_string)
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(prepared=True)

        #continue the event_loop
        while(sign_in_event_loop):
            #account_id
            id = input("Please Enter Account ID: ")
            isvalid = valid_id(id)
            #print (cursor.fetchall())
            print_cursor()
            if not cursor.rowcount:
                if (id == "end" or id == "q"):
                    sign_in_event_loop = 0
                else:
                    print("Invalid ID: Try again")
                continue
            else:
            #See if we can do a welcome and ask which report they would like to see
                reports_event_loop = 1
            #continue the event_loop
            while(reports_event_loop):
                #enter command propmt
                cmd = input("Type Report Number: ")
                #parse input
                args = cmd.split(" ")
                #reports or r
                if(len(args) == 1):
                    # Report options and descriptions
                    if(args[0] == 'r' or args[0].lower() == "report" ):
                        print("""
                        Report 1: What is the average change of price of stocks in my watchlist?
                            Parameter(s): Account ID 
                            
                            
                        Report 2: What order lost/made me the most money?
                            Parameter(s): Account ID
                            
                            
                        Report 3: What orders are open?
                            Parameter(s): Account ID, Order Status
                            
                            
                        Report 4: How many orders have I made?
                            Parameter(s): Account ID
                            
                            
                        Report 5: What stock has made me the most money?
                            Parameter(s): Account ID
                            
                            
                        Report 6: What stock has lost me the most money?
                            Parameter(s): Account ID
                            
                            
                        Report 7: How many open order do I have on the stock with the highest change in percent?
                            Parameter(s): Account ID
                            
                            
                        Report 8: How much have I made/lost?
                            Parameter(s): Account ID
                        """)
                    # q or end
                    if (args[0] == "end" or args[0] == "q"):
                        reports_event_loop = 0
                    elif (args[0] == "end!" or args[0] == "q!"):
                        reports_event_loop = 0
                        sign_in_event_loop = 0


                elif(args[0] == 'r' or args[0].lower() == "report"
                    and len(args) == 2):
                    # reports 1-8 and theyre function calls
                    # output english query and result
                    if(args[1] == "1"):
                        print("""Report 1: What is the average change of price of stocks in my watchlist?\nParameter(s): Account ID """)
                        print("Returns:\nWatchlist Name -- Average Percent Change")
                        Report_1(id);
                        #print( cursor.fetchall() )

                    elif(args[1] == "2"):
                        print("""Report 2: What order lost/made me the most money?\nParameter(s): Account ID""")
                        print("Returns:\nID -- Order Number -- Asset Name -- Date -- Time -- Amount -- Currency -- Activity -- Stop Loss -- Take Profit -- Profit -- Order Status")
                        Report_2(id);
                        #print( cursor.fetchall() )
                        print_cursor()

                    elif(args[1] == "3"):
                        print("""Report 3: What orders are open or closed?\nParameter(s): Account ID, Order Status """)
                        print("Returns:\nID -- Order Number -- Asset Name -- Date -- Time -- Amount -- Currency -- Activity -- Stop Loss -- Take Profit -- Profit -- Order Status")
                        order_status_str = input("Open or Closed orders?: ")
                        if (order_status_str.lower() == 'o' or order_status_str.lower() == "open"):
                            status = 1
                        elif (order_status_str.lower() == 'c' or order_status_str.lower() == "closed"):
                            status = 0
                        else: continue
                        Report_3(id, status);
                        #print( cursor.fetchall() )
                        print_cursor()

                    elif(args[1] == "4"):
                        print("""Report 4: How many orders have I made?\nParameter(s): Account ID""")
                        print("Returns:\nID -- Order Count")
                        Report_4(id);
                        #print( cursor.fetchall() )
                        print_cursor()

                    elif(args[1] == "5"):
                        print("""Report 5: What stock has made me the most money?\nParameter(s): Account ID""")
                        print("Returns:\nID -- Asset Name -- Highest Profit ")
                        Report_5(id);
                        #print( cursor.fetchall() )
                        print_cursor()

                    elif(args[1] == "6"):
                        print("""Report 6: What stock has lost me the most money?\nParameter(s): Account ID""")
                        print("Returns:\nID -- Asset Name -- Lowest Profit ")
                        Report_6(id);
                        #print( cursor.fetchall() )
                        print_cursor()

                    elif(args[1] == "7"):
                        print("""Report 7: How many open order do I have on the stock with the highest change in percent?\nParameter(s): Account ID""")
                        Report_7(id);
                        #print( cursor.fetchall() )
                        print_cursor()

                    elif(args[1] == "8"):
                        print("""Report 8: How much have I made/lost?\nParameter(s): Account ID""")
                        print("Returns:\nID -- Profit Sum ")
                        Report_8(id);
                        #print( cursor.fetchall() )
                        print_cursor()

                else:
                    print("Invalid Input: Try again",
                          "[cmd] [value]")


        #create_orders_inserts(df)
        #print("Data inserted successfully into employee table using the prepared statement")


    except mysql.connector.Error as error:
        print("parameterized query failed {}".format(error))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")



    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
