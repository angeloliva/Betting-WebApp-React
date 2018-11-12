import * as React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

interface Props {
  children: React.ReactNode
  open: boolean
  title: string
  subTitle?: string
  onCancel: () => void
  onConfirm: () => void
}

interface State {
  loading: boolean
}

export class GenericDialog extends React.PureComponent<Props, State> {
  state = {
    loading: false,
  }

  onChangeLoading = (loading: false) => this.setState({ loading })

  private renderChild() {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, {
      onChangeLoading: this.onChangeLoading,
    })
  }

  render() {
    const { open, title, subTitle, onCancel, onConfirm } = this.props
    const { loading } = this.state
    return (
      <Dialog
        fullScreen={true}
        open={open}
        onClose={onCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {subTitle && <DialogContentText>{subTitle}</DialogContentText>}
          {this.renderChild()}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            color="primary"
            autoFocus
            disabled={loading}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default GenericDialog
