import React from 'react';
import IconedMessage from './IconedMessage';

export default ({ ...props }) => (<IconedMessage loading={true} {...props}/>);

// const ActionLoader = (props) => {

//     const { type, message, loading, nav, ...custom } = props;

//     const success = (type === "success");
//     const error = (type === "error");

//     return (
//         <Message icon={!!loading} success={success} error={error} >
//             {loading && <Icon name='circle notched' loading={!!loading} />}
//             <Message.Content>
//                 {loading && <Message.Header>{t("Please wait...")}</Message.Header>}
//                 {message}
//             </Message.Content>
//             <Message.Content>
//                 {nav}
//             </Message.Content>
//         </Message>
//     );
// };

// export default withRouter(connect()(ActionLoader));