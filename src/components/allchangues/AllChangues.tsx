import React, { useEffect } from "react";
import { getChangesCoins, getChanguesSpecific } from "../service/service";
import { useAppContext } from "../../context/context";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { Link } from "@material-ui/core/";
import { ChangeType } from "../../types/Types";
import { Button } from "@material-ui/core/";
import { yellow } from "@material-ui/core/colors";

const AllChangues = () => {
  const history = useHistory();
  const { state, setState } = useAppContext();
  const { changesCoins } = state;

  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";
  const numeric: IType = "numeric";

  const columns = [
    {
      title: "Name",
      field: "name",
      type: string,
    },
    {
      title: "Biance",
      field: "name_id",
      type: string,
    },
    {
      title: "Date live",
      field: "date_live",
      type: numeric,
    },
    {
      title: "Country",
      field: "country",
      type: string,
    },
    {
      title: "Udate",
      field: "udate",
      type: string,
    },
    {
      title: "Fiat",
      field: "fiat",
      type: string,
    },

    {
      title: "Volume_usd",
      field: "volume_usd",
      type: numeric,
    },
  ];

  const handleRowClick = (coin: ChangeType | ChangeType[]) => {
    if (!Array.isArray(coin)) {
      getChanguesSpecific(coin.id).then((result) => {
        setState({
          ...state,
          selectedSpecificChangue: result.pairs,
        });

        history.push("/specificChangues");
      });
    }
  };
  useEffect(() => {
    if (!changesCoins) {
      getChangesCoins().then((result) => {
        setState({
          ...state,
          changesCoins: Object.values(result),
        });
      });
    }
  }, [changesCoins, setState, state]);

  return (
    <div className="content_table">
      <MaterialTable
        title="All exchanges coins"
        columns={columns}
        data={changesCoins || []}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => handleRowClick(rowData),
          },
        ]}
        options={{
          pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
          pageSize: 10,
        }}
        components={{
          Action: (props) => (
            <div>
              <Link color="primary" href={props.data.url} target="_blank">
                Buy coin
              </Link>
              <Button
                onClick={(event) => props.action.onClick(event, props.data)}
                color="primary"
                variant="contained"
                style={{ backgroundColor: yellow[700], color: "white" }}
                size="small"
              >
                specific
              </Button>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default AllChangues;
