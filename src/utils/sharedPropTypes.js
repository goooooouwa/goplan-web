import PropTypes from 'prop-types';

const SHARED_PROP_TYPES = {
    marks: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
    })).isRequired,
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        targetDate: PropTypes.string,
    }).isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        projectId: PropTypes.number.isRequired,
        status: PropTypes.bool,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string,
        repeat: PropTypes.bool,
        repeat_period: PropTypes.string,
        repeat_times: PropTypes.number,
        instanceTimeSpan: PropTypes.number.isRequired,
        parents: PropTypes.array.isRequired,
        children: PropTypes.array.isRequired,
        dependencies: PropTypes.array.isRequired,
        dependents: PropTypes.array.isRequired
    }).isRequired,
};

export default SHARED_PROP_TYPES;