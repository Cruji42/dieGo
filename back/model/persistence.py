#from sqlalchemy import Table, Column
#from sqlalchemy.sql.sqltypes  import Integer, String
from config.db import engine, meta_data

metadata_object = meta_data
#MAPEA TODA LA BASE DE DATOS
metadata_object.reflect(bind=engine)

users = metadata_object.tables['tbl_users']
tbl_events = metadata_object.tables['tbl_events']
tbl_events_created = metadata_object.tables['tbl_events_created']
tbl_events_saved = metadata_object.tables['tbl_events_saved']

print("Tables Processed")
for t in metadata_object.sorted_tables:
    print(t.name)