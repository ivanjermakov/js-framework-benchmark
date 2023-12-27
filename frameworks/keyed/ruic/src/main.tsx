import { Component, Signal, render } from 'ruic'
import { map } from 'ruic/operator'
import { Datum, N, N_LOTS, buildData } from './data'

interface ButtonProps {
    id: string
    text: string
    fn: () => void
}

class Button extends Component<ButtonProps> {
    render(): JSX.Element {
        return (
            <div class="col-sm-6 smallpad">
                <button id={this.props.id} class="btn btn-primary btn-block" type="button" onClick={this.props.fn}>
                    {this.props.text}
                </button>
            </div>
        )
    }
}

class App extends Component {
    data = new Signal<Datum[]>([])
    selected = new Signal<number | undefined>(undefined)

    constructor(props: {}) {
        super(props)
    }

    run(): void {
        this.data.set(buildData(N))
    }

    runLots(): void {
        this.data.set(buildData(N_LOTS))
    }

    add(): void {
        this.data.update(d => [...d, ...buildData(N)])
    }

    update(): void {
        const d = this.data.get()
        for (let i = 0; i < d.length; i += 10) {
            d[i].label.update(l => l + ' !!!')
        }
    }

    clear(): void {
        this.data.set([])
    }

    swapRows(): void {
        const d = this.data.get().slice()
        if (d.length > N - 2) {
            let tmp = d[1]
            d[1] = d[N - 2]
            d[N - 2] = tmp
            this.data.set(d)
        }
    }

    remove(id: number) {
        this.data.update(d => {
            const idx = d.findIndex(d => d.id === id)
            return [...d.slice(0, idx), ...d.slice(idx + 1)]
        })
    }

    override render() {
        return (
            <div class="container">
                <div class="jumbotron">
                    <div class="row">
                        <div class="col-md-6">
                            <h1>Ruic</h1>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <Button id="run" text="Create 1,000 rows" fn={() => this.run()} />
                                <Button id="runlots" text="Create 10,000 rows" fn={() => this.runLots()} />
                                <Button id="add" text="Append 1,000 rows" fn={() => this.add()} />
                                <Button id="update" text="Update every 10th row" fn={() => this.update()} />
                                <Button id="clear" text="Clear" fn={() => this.clear()} />
                                <Button id="swaprows" text="Swap Rows" fn={() => this.swapRows()} />
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-hover table-striped test-data">
                    <tbody>
                        {this.data.pipe(
                            map(d =>
                                d.map(row => {
                                    const danger = this.selected.pipe(
                                        map(s => (s === row.id ? 'danger' : '') as string | undefined)
                                    )
                                    return (
                                        <tr class={danger}>
                                            <td class="col-md-1">{row.id}</td>
                                            <td class="col-md-4">
                                                <a onClick={() => this.selected.set(row.id)}>{row.label}</a>
                                            </td>
                                            <td class="col-md-1">
                                                <a onClick={() => this.remove(row.id)}>
                                                    <span class="glyphicon glyphicon-remove" aria-hidden="true" />
                                                </a>
                                            </td>
                                            <td class="col-md-6" />
                                        </tr>
                                    )
                                })
                            )
                        )}
                    </tbody>
                </table>
                <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
            </div>
        )
    }
}

render(<App />, document.getElementById('main')!)
