import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useAppContext } from "../../context/context";
import Twitter from "@material-ui/icons/Twitter";
import Reddit from "@material-ui/icons/Reddit";
const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
interface ChildProps {
  handleState: () => void;
}

const ModalSocialState: React.FC<ChildProps> = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { state } = useAppContext();
  const { selectedState, selectedStateReddit } = state;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    props.handleState();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="content_socialState">
        <div className="content_twitter">
          <h6>Twitter</h6>
          <Twitter className="twitter" />
          <p>
            <span className="span_followers">followers</span>:
            {selectedState?.followers_count}
          </p>
          <p>
            <span className="span_followers">status count</span>:
            {selectedState?.status_count}
          </p>
        </div>
        <div className="content_Reddit">
          <h6>Reddit</h6>
          <Reddit className="reddit" />
          <p>
            <span className="span_followers">Active users</span>:
            {selectedStateReddit?.avg_active_users}
          </p>
          <p>
            <span className="span_followers">Aubscribers</span>:
            {selectedStateReddit?.subscribers}
          </p>
        </div>
      </div>
      <Button variant="contained" color="secondary" onClick={handleClose}>
        Close
      </Button>
    </div>
  );

  return (
    <div>
      <Button
        style={{ backgroundColor: green[500], color: "white", width: "240px" }}
        variant="contained"
        disableElevation
        onClick={handleOpen}
      >
        social stats for coin
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default ModalSocialState;
