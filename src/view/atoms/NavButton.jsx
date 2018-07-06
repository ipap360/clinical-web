import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

const BLink = ({ to, replace = false }) => (<Link to={to} replace />)
export default ({ to, ...props }) => (<Button component={BLink} {...props} />)