# write_to_csv.py
import sys
import csv

# Get the user input from Node.js server
user_input = sys.argv[1]

# Log the input
print(f'Received input from Node.js: {user_input}')

# Write the input to the CSV file
with open('pizzeria.csv', 'a', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow([user_input])

# Log the completion
print('Data has been written to pizzeria.csv')
