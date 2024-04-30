# data_analysis/

### Directory Structure 
```
data_analysis/
├── README.md
├── create_sheets.ipynb
├── excel/
│   |-- Giudecca_Factories.xlsx
├── csvs/
│   ├── Building.csv
│   ├── Employment_Over_Time.csv
│   ├── Factory_At_Building.csv
│   ├── Factory.csv
│   ├── Giudecca_Population_Over_Time.csv
│   ├── Product_Over_Time.csv
│   ├── Timeperiods.csv
```

### Description 

**create_sheets.ipynb** The file *create_sheets.ipynb* is a jupyter notebook that takes in an excel file with multiple sheets containing entity and relationship tables. The excel file is read and the sheets of interest are separated into individual CSV files such that they can be uploaded to ArcGIS and used to create feature layers. The output directory is defined in *create_sheets.ipynb*. 

**csvs/** The *csvs/* directory is the default output directory for the CSV files created by *create_sheets.ipynb*. The output directory name can be changed in *create_sheets.ipynb*. 

**excel/** The *excel/* directory contains the input file(s) to read from. The input directory and input filename can be changed in *create_sheets.ipynb*. 

