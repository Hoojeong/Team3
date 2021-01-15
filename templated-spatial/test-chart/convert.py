#!/usr/bin/env python3

# advanced example!

# load input1.csv (expenditures) and input2.json (legislators)

# we will merge the two datasets based on bioguide id

# create a mapping (dict) of legislators where the key is bioguide id
# and the value is the whole legislator dict

# loop through the expenditures and filter down to those where the bioguide id exists
# look up the bioguide in the legislator mapping we created above
# if the bioguide doesn't exist in the mapping, skip it

# after finding the legislator, check the legislator's party in his/her last term

# group by sum the AMOUNT based on CATEGORY and party: 
#   loop through the rows and sum together the AMOUNT for each combination of CATEGORY and party
# this is very similar to example3 except we are grouping by two columns instead of 1

# output a json array to output.json using json.dump that looks like
# {
#     'label': ...,
#     'Democrat': ...,
#     'Republican': ...
# }
