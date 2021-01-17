import json
import csv
with open("immigration_input.csv") as f:
	reader = csv.DictReader(f)
	opinion = list(reader)

#print(opinion)
filename="immigration_output.json"
with open(filename, "w") as f:
	json.dump(opinion, f, indent=2)

# step1 make a list of unique id: Q1, Q2...
unique_ids=["Q1","Q2","Q3","Q4","Q5","Q6","Q7"]

# loop over the list
for n in unique_ids: 
	# write a new json file for each question
	filename=n+".json"
	opinion_for_question=[]
	print(filename)
	for item in opinion:
		if item["id"] == n:
			item_without_id=item.copy()
			del item_without_id["id"]
			opinion_for_question.append(item_without_id)
			print(item_without_id) 

	#with fill out opinion for question only contain that opinion with Qn
	with open(filename, 'w') as f:
		json.dump(opinion_for_question, f, indent=2)



			