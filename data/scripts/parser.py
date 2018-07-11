from os import listdir
import csv,json


def find_csv_filenames( path_to_dir, suffix=".csv" ):

    filenames = listdir(path_to_dir)
    return [ filename for filename in filenames if filename.endswith( suffix ) ]


def parse_csv(file_name):

		with open("../2006-2014/" + file_name, 'rb') as csvfile:
			reader = csv.reader(csvfile, delimiter=',', quotechar='|')

			for _ in range(11):
				next(reader)

			reader = list(reader)

			months = []
			for rows in reader:
				month = rows[0][4:].replace('"', '')
				months.append(month)
			
			months = set(months)

			for i in months:
			 	with open("../output/" + i + '.json', 'w') as output:
			 		month_data = []
			 		for rows in reader:
			 			month = rows[0][4:].replace('"', '')
			 			if month == i:
			 				month_data.append(rows)

			 		series = []
			 		data_points = []
			 		for item in month_data:
			 			if item[4] != '-1.E+34  ':
			 				data_points.append(float(item[3]))
			 				data_points.append(float(item[2]))
			 				data_points.append(float(item[4]))

			 		series = [[i,data_points]]
			 		json.dump(series, output)

def parse_csvs(list_files):

	for file in list_files:
		parse_csv(file)

#parse_csv("200606-200612-A50B2498593501260892EEDEB9452B8A_ferret_listing.csv")

list_files = find_csv_filenames("../2006-2014")
parse_csvs(list_files)