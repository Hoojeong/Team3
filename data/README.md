# example 6: stacked horizontal bar

1. Look at the original data formats.

    ```
    cat input1.csv
    cat input2.json
    ```

2. Look at the output data format.

    ```
    cat dummy.json | jq
    ```

3. Create a script, `convert.py` that will transform `input1.csv` and `input2.json` into `output.json`.

4. Navigate to `http://localhost:8000/example6` in your browser and see the interactive work.

Sources:
- Data:
	- [House Office Expenditure](https://projects.propublica.org/represent/expenditures)
		- input1.csv is [2017Q1-house-disburse-detail.csv](https://projects.propublica.org/congress/assets/staffers/2017Q1-house-disburse-detail.csv)
	- [unitedstates/congress-legislators](https://github.com/unitedstates/congress-legislators)
		- input2.json is [legislators-current.json](https://theunitedstates.io/congress-legislators/legislators-current.json)
- Visualization: [Stacked Horizontal Bar Chart](http://bl.ocks.org/juan-cb/c2f3329d3fb3b8e4f7ff)

