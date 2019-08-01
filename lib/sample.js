/*
Transacao para registrar ponto
@param {br.com.ramir.test.registerClock} registerClock
@transaction
*/
function registerClock(pnt) {
    const factory = getFactory();
    const NS = 'br.com.ramir.test';
    const ativoNamespace = NS + '.Ponto';
    const generatedId = Math.random().toString(36).substring(2,10) + '-' +
    Math.random().toString(36).substring(2,6) + '-' +
    Math.random().toString(36).substring(2,6) + '-' +
    Math.random().toString(36).substring(2,10);
    var registro = factory.newResource(NS, 'Ponto', generatedId);
    registro.batida = pnt.batida;
    registro.colaborador = pnt.colaborador;
    registro.gestor = pnt.gestor;
    return getAssetRegistry(ativoNamespace)
    .then(function (pontoReg) {
    return pontoReg.add(registro);
    })
    .catch(function (error) {
    throw new Error(error);
    });
    
}

/*
Transacao para aprovar regstros de pontos
@param {br.com.ramir.test.aprovaRegistro} aprovaRegistro
@transaction
*/
function approveRegister(reg) {
    const factory = getFactory();
    const NS = 'br.com.ramir.test';
    const ativoNamespace = NS + '.Ponto';
    var registro = factory.newResource(NS, 'Ponto', reg.id);
    registro.aprovacao_status = reg.batida;
    registro.colaborador = reg.colaborador;
    registro.gestor = reg.gestor;
    atualizaRegistro = getAssetRegistry(ativoNamespace)
    .then(function (pontoReg) {
        return pontoReg.update(registro);
    });
    return getAssetRegistry(ativoNamespace)
    .then(function (pontoReg) {
    return pontoReg.exists(registro.id);
    })
    .then(function(exist) {
    if(exist) {
    return atualizaRegistro;
    }
    throw new Error("Registro não encontrado!");
    })
    .catch(function (error) {
    throw new Error(error);
    });
    }