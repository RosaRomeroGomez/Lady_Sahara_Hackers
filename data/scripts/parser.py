import csv,json


def read_csv(file_path):

	with open('../output.json', 'w') as output:
		with open(file_path, 'rb') as csvfile:
			reader = csv.reader(csvfile, delimiter=',', quotechar='|')
			writer = csv.writer(output, delimiter=',', quotechar='|')

			for _ in range(11):
				next(reader)

			data_points = []
			date = ''	
			for rows in reader:
				date = rows[0]
				data_points.append(float(rows[2]))
				data_points.append(float(rows[3]))
				data_points.append(float(rows[4]))

			series = [[date,data_points]]

			json.dump(series, output)			



read_csv('../36E09D4B17B41DE8B808C59AC08D3E5D_ferret_listing.csv')
