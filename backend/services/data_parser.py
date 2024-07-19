import pandas as pd


def parse_points():
    df = pd.read_csv("assets/epl_standings.csv")
    df_points = df.filter(["Season", "Team", "Pts"])
    df_points["Prompt"] = df_points["Season"] + " " + df_points["Team"]
    df_points = df_points.filter(["Prompt", "Pts"])
    return df_points.to_json(orient="records")
