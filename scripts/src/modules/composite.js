(function(j){
    'use strict';

    //This is complicated and I don't expect people to grok it on first read.
    function curry(userFn){
        var args = j.slice(1, arguments),
            argumentCount = j.shortCircuit(0, j.countArguments, userFn),
            appliedFn = (args.length < argumentCount) ? j.apply(j.partial, j.concat([curry, userFn], args)) : null,
            result = (!!userFn && args.length >= argumentCount) ? j.apply(userFn, args) : null;

        return j.either(appliedFn, result);
    }

    //zOMG! TAIL RECURSION
    function recursor(recurFn){
        var args = j.slice(1, arguments);

        //This is to make the returned function distinct and identifiable.
        return function recursorFn(localRecursor){
            return j.apply(recurFn, j.concat([localRecursor], args));
        };
    }

    function verifyRecurValue(recurValue){
        return typeof recurValue === 'function' &&
            recurValue.toString().match('recursorFn');
    }

    //Tail optimization with managed recursion is really complicated.
    //Please don't muck with this unless you TRULY understand what is happening.
    function recur(userFn){
        var recursingFn = j.either(j.identity, userFn),
            localRecursor = j.partial(recursor, recursingFn),
            recurValue = j.apply(localRecursor, j.slice(1, arguments));

        while(verifyRecurValue(recurValue = recurValue(localRecursor)) && recursingFn !== j.identity);

        return recurValue;
    }

    function reduce(userFn, values, initialState){
        var initialValue = j.either(j.first(values), initialState),
            remainder = initialValue === initialState ? values : j.rest(values);
            
        function reducer(recur, reduction, collection){
            return (collection.length) ?
                recur(userFn(reduction, j.first(collection)), j.rest(collection)) :
                reduction;
        }

        return (!!values && values.length > 0) ? recur(reducer, initialValue, remainder) : null;
    }

    //Performs 'and' operation on valueSet
    function ander(recur, current, valueSet){
        return (valueSet.length === 0) ?
            current :
            recur(current && !!j.first(valueSet), j.rest(valueSet));
    }

    function and(){
        return recur(ander, true, j.slice(0, arguments));
    }

    //Performs 'or' operation on valueSet
    function orer(recur, current, valueSet){
        return (valueSet.length === 0) ?
            current :
            recur(current || !!j.first(valueSet), j.rest(valueSet));
    }

    function or(){
        return recur(orer, false, j.slice(0, arguments));
    }

    function xor(a, b){
        return !!(or(a, b) && j.not(j.isTruthy(a) === j.isTruthy(b)));
    }

    //Produces a function that returns f(g(x))
    function compositor(f, g){
        return function(){
            return f(j.apply(g, j.slice(0, arguments)));
        };
    }

    function compose(){
        var args = j.slice(0, arguments);
        return (args.length >= 1) ? reduce(compositor, args) : j.identity;
    }

    function pipeline(value){
        return j.apply(compose, j.slice(1, arguments).reverse())(value);
    }

    function unique(valueSet){
        var values = j.slice(0, valueSet).sort(),
            finalValues = [];

        function operator(value){
            finalValues = j.eitherIf(finalValues,
                                     j.conj(value, finalValues),
                                     j.compose(j.not,
                                               j.partial(j.equal, value),
                                               j.last)(finalValues));
        }

        j.each(operator, values);

        return finalValues;
    }

    function partialReverse(){
        var args = j.slice(0, arguments),
            partialAndReverse = j.compose(j.reverseArgs, j.partial);
            
        return j.apply(partialAndReverse, args);
    }

    function keyDeref(baseObj, key){
        return j.isNull(baseObj) || j.isUndefined(baseObj[key]) ? null : baseObj[key];
    }

    function deref(baseData, key, defaultValue){
        var keyTokens = j.either('', key).split('.'),
            safeData = j.isUndefined(baseData) ? null : baseData,
            outputData = j.isTruthy(key) ? j.reduce(keyDeref, keyTokens, safeData) : safeData;
        
        return outputData === null && !j.isUndefined(defaultValue) ? defaultValue : outputData;
    }

    j.and = and;
    j.compact = j.partial(j.filter, j.isTruthy);
    j.compose = compose;
    j.curry = curry;
    j.deref = deref;
    j.or = or;
    j.partialReverse = partialReverse;
    j.pipeline = pipeline;
    j.recur = recur;
    j.reduce = reduce;
    j.unique = unique;
    j.xor = xor;

})(jfp);
