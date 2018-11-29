import React from "react";
import PropTypes from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Retry, Loader } from "../atoms";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedSuccessfully: false,
            isLoading: false,
            failedToLoad: null,
            originalValues: undefined,
            initialValues: undefined
        };
        this.innerRef = React.createRef();
    }

    unpack = values => {
        const { postLoadFormat } = this.props;
        return postLoadFormat ? postLoadFormat(values) : values;
    };

    pack = values => {
        const { preSaveFormat } = this.props;
        return preSaveFormat
            ? preSaveFormat(values, this.state.originalValues)
            : values;
    };

    load = () => {
        const { id = 0, load } = this.props;
        if (typeof load !== "function" || id === 0) return;
        const ref = this;

        ref.setState({ isLoading: true, failedToLoad: null });
        load(id)
            .then(data => {
                ref.setState({
                    isLoading: false,
                    originalValues: data,
                    initialValues: this.unpack(data)
                });
            })
            .catch(error => {
                ref.setState({
                    isLoading: false,
                    failedToLoad: error,
                    originalValues: {},
                    initialValues: {}
                });
            });
    };

    save = values => {
        const { id = 0, save, onSaveSuccess } = this.props;
        const saveValues = this.pack(values);
        const ref = this;
        return new Promise(resolve => {
            save(id, saveValues)
                .then(response => {
                    // re-initialize
                    ref.setState(
                        {
                            savedSuccessfully: true,
                            originalValues: saveValues,
                            initialValues: ref.unpack(saveValues)
                        },
                        () => {
                            if (typeof onSaveSuccess === "function") {
                                onSaveSuccess.apply(ref, [ref, response]);
                            }
                        }
                    );
                    resolve();
                })
                .catch(error => {
                    if (typeof error === "object") {
                        resolve(error);
                    } else {
                        resolve({
                            [FORM_ERROR]:
                                error || "An unspecified error occurred"
                        });
                    }
                });
        });
    };

    setValue = (name, value) => {
        const finalform = this.innerRef.current;
        if (!finalform) return;
        finalform.form.change(name, value);
    };

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        // eslint-disable-next-line
        if (prevProps.id != this.props.id) {
            this.load();
        }
    }

    componentWillUnmount() {}

    render() {
        const {
            id,
            className,
            children,
            load,
            subscription = {},
            mutators = {},
            t = s => s,
            suggestedValues = {},
            formProps = {},
            ...rest
        } = this.props;

        const {
            isLoading,
            failedToLoad,
            initialValues,
            savedSuccessfully
        } = this.state;

        if (isLoading) return <Loader>{t("Loading...")}</Loader>;

        if (failedToLoad)
            return <Retry action={this.load}>{failedToLoad}</Retry>;

        const extraValues = !savedSuccessfully ? suggestedValues : {};

        return (
            <FinalForm
                {...rest}
                subscription={{ ...subscription }}
                initialValues={{
                    ...initialValues,
                    ...extraValues
                }}
                onSubmit={this.save}
                mutators={{
                    setValues: (args, state, { changeValue }) => {
                        const values = args[0];
                        for (let name in values) {
                            const value = values[name];
                            changeValue(state, name, () => value);
                        }
                    },
                    ...mutators
                }}
                ref={this.innerRef}
            >
                {({ handleSubmit }) => {
                    return (
                        <form
                            onSubmit={handleSubmit}
                            className={className}
                            {...formProps}
                        >
                            {children}
                        </form>
                    );
                }}
            </FinalForm>
        );
    }
}

Form.propTypes = {
    load: PropTypes.func,
    postLoadFormat: PropTypes.func,
    preSaveFormat: PropTypes.func,
    save: PropTypes.func.isRequired
};

export default Form;
