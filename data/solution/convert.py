#!/usr/bin/env python3

import csv
import json

with open('input1.csv') as f:
    reader = csv.DictReader(f)
    expenditures = list(reader)

with open('input2.json') as f:
    legislators = json.load(f)

# create mapping of legislators keyed on bioguide id
legislators_mapping = {}
for legislator in legislators:
    bioguide_id = legislator['id']['bioguide']
    legislators_mapping[bioguide_id] = legislator

# get party from legislators_mapping for each row in expenditure with a bioguide id
# group by category AND party

costs_by_category_and_party = {}
for expenditure in expenditures:
    if expenditure['BIOGUIDE_ID']:
        category = expenditure['CATEGORY']
        amount = float(expenditure['AMOUNT'])
        bioguide_id = expenditure['BIOGUIDE_ID']
        if bioguide_id in legislators_mapping:
            legislator = legislators_mapping[bioguide_id]
            party = legislator['terms'][-1]['party']

            if category in costs_by_category_and_party:
                if party in costs_by_category_and_party[category]:
                    costs_by_category_and_party[category][party] += amount
                else:
                    costs_by_category_and_party[category][party] = amount
            else:
                costs_by_category_and_party[category] = {}
                costs_by_category_and_party[category][party] = amount

outputs = []
for category, costs in costs_by_category_and_party.items():
    outputs.append({
        'label': category,
        'Democrat': costs.get('Democrat', 0),
        'Republican': costs.get('Republican', 0)
    })

with open('output.json', 'w') as f:
    json.dump(outputs, f, indent=4)
