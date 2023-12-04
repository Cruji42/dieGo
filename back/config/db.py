from sqlalchemy import create_engine, MetaData, text

#engine = create_engine('postgresql+psycopg2://:$\@/')
#engine = create_engine('postgresql+psycopg2://postgres:$126K4600a\@localhost/db_events')
conf ={
    'host':"db-instance.clubp6niaicc.us-east-2.rds.amazonaws.com",
    # 'host':"localhost",
    'port':'5432',
    'database':"db_events",
    'user':"postgres",
    'password':"$126K4600a"
}
engine = create_engine("postgresql://{user}:{password}@{host}:{port}/{database}".format(**conf))
meta_data = MetaData()

text = text

print("Connected to database", engine.connect())