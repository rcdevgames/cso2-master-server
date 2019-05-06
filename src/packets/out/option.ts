import { WritableStreamBuffer } from 'stream-buffers'

import { PacketId } from 'packets/definitions'
import { OutPacketBase } from 'packets/out/packet'

import { OutOptionBuyMenu } from 'packets/out/option/buymenu'

import { UserBuyMenu } from 'user/userbuymenu'

enum OutOptionPacketType {
    SetBuyMenu = 1,
}

/**
 * outgoing room information
 * @class OutOptionPacket
 */
export class OutOptionPacket extends OutPacketBase {
    public static setBuyMenu(buyMenu: UserBuyMenu): OutOptionPacket {
        const packet: OutOptionPacket = new OutOptionPacket()

        packet.outStream = new WritableStreamBuffer(
            { initialSize: 40, incrementAmount: 15 })

        packet.buildHeader()
        packet.writeUInt8(OutOptionPacketType.SetBuyMenu)

        OutOptionBuyMenu.build(buyMenu, packet)

        return packet
    }
    constructor() {
        super(PacketId.Option)
    }
}
